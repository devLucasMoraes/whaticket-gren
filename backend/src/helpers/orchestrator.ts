import retry from "async-retry";
import { DataSource } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

class TestOrchestrator {
  private static instance: TestOrchestrator;
  private dataSource: DataSource | null = null;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): TestOrchestrator {
    if (!TestOrchestrator.instance) {
      TestOrchestrator.instance = new TestOrchestrator();
    }
    return TestOrchestrator.instance;
  }

  async connect() {
    if (!this.isConnected) {
      try {
        if (!AppDataSource.isInitialized) {
          this.dataSource = await AppDataSource.initialize();
        } else {
          this.dataSource = AppDataSource;
        }
        this.isConnected = true;
      } catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
        throw error;
      }
    }
    return this.dataSource;
  }

  async disconnect() {
    if (this.dataSource && this.isConnected) {
      await this.dataSource.destroy();
      this.isConnected = false;
      this.dataSource = null;
    }
  }

  async waitForAllServices(maxRetries: number = 5) {
    return retry(
      async () => {
        await this.connect();
      },
      {
        retries: maxRetries,
        minTimeout: 1000,
        maxTimeout: 3000,
        onRetry: (error, attemptNumber) => {
          console.log(
            `Tentativa ${attemptNumber}: Erro ao conectar com o banco de dados`
          );
        },
      }
    );
  }

  async clearDatabase() {
    if (!this.isConnected) {
      await this.connect();
    }

    // Executa as deleções em uma única transação
    await this.dataSource?.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from(User)
        .execute();
    });
  }
}

// Exporta uma instância única do orchestrator
export const orchestrator = TestOrchestrator.getInstance();
