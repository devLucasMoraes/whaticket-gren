export interface Service {
  //whatsappService
  AssociateWhatsappQueue(whatsapp: Whatsapp, queueIds: number[]): Promise<void>;
  CreateWhatsAppService({
    name,
    status = "OPENING",
    queueIds = [],
    greetingMessage,
    farewellMessage,
    isDefault = false,
  }: Request): Promise<Response>;
  DeleteWhatsAppService(id: string): Promise<void>;
  ListWhatsAppsService(): Promise<Whatsapp[]>;
  ShowWhatsAppService(id: string | number): Promise<Whatsapp>;
  UpdateWhatsAppService({
    whatsappData,
    whatsappId,
  }: Request): Promise<Response>;
  //wbotService
  CheckIsValidContact(number: string): Promise<void>;
  CheckContactNumber(number: string): Promise<void>;
  DeleteWhatsAppMessage(messageId: string): Promise<Message>;
  GetProfilePicUrl(number: string): Promise<string>;
  ImportContactsService(userId: number): Promise<void>;
  SendWhatsAppMedia({ media, ticket, body }: Request): Promise<WbotMessage>;
  SendWhatsAppMessage({
    body,
    ticket,
    quotedMsg,
  }: Request): Promise<WbotMessage>;
  StartAllWhatsAppsSessions(): Promise<void>;
  StartWhatsAppSession(whatsapp: Whatsapp): Promise<void>;
  wbotMessageListener(wbot: Session): void;
  wbotMonitor(wbot: Session, whatsapp: Whatsapp): Promise<void>;
  //userService
  AuthUserService({ email, password }: Request): Promise<Response>;
  CreateUserService({
    email,
    password,
    name,
    queueIds = [],
    profile = "admin",
    whatsappId,
  }: Request): Promise<Response>;
  DeleteUserService(id: string | number): Promise<void>;
  ListUsersService({
    searchParam = "",
    pageNumber = "1",
  }: Request): Promise<Response>;
  ShowUserService(id: string | number): Promise<User>;
  UpdateUserService({
    userData,
    userId,
  }: Request): Promise<Response | undefined>;
  //ticketService
  CreateTicketService({
    contactId,
    status,
    userId,
    queueId,
  }: Request): Promise<Ticket>;
  DeleteTicketService(id: string): Promise<Ticket>;
  FindOrCreateTicketService(
    contact: Contact,
    whatsappId: number,
    unreadMessages: number,
    groupContact?: Contact
  ): Promise<Ticket>;
  ListTicketsService({
    searchParam = "",
    pageNumber = "1",
    queueIds,
    status,
    date,
    showAll,
    userId,
    withUnreadMessages,
  }: Request): Promise<Response>;
  ShowTicketService(id: string | number): Promise<Ticket>;
  UpdateTicketService({ ticketData, ticketId }: Request): Promise<Response>;
  //settingService
  ListSettingByKeyService(value: string): Promise<Response | undefined>;
  ListSettingsService(): Promise<Setting[] | undefined>;
  UpdateSettingService({ key, value }: Request): Promise<Setting | undefined>;
  //quickAnswerService
  CreateQuickAnswerService({
    shortcut,
    message,
  }: Request): Promise<QuickAnswer>;

  DeleteQuickAnswerService(id: string): Promise<void>;
  ListQuickAnswerService({
    searchParam = "",
    pageNumber = "1",
  }: Request): Promise<Response>;
  ShowQuickAnswerService(id: string): Promise<QuickAnswer>;
  UpdateQuickAnswerService({
    quickAnswerData,
    quickAnswerId,
  }: Request): Promise<QuickAnswer>;
  //queueService
  CreateQueueService(queueData: QueueData): Promise<Queue>;
  DeleteQueueService(queueId: number | string): Promise<void>;
  ListQueuesService(): Promise<Queue[]>;
  ShowQueueService(queueId: number | string): Promise<Queue>;
  UpdateQueueService(
    queueId: number | string,
    queueData: QueueData
  ): Promise<Queue>;
  //messageService
  CreateMessageService({ messageData }: Request): Promise<Message>;
  ListMessagesService({
    pageNumber = "1",
    ticketId,
  }: Request): Promise<Response>;
  //contactService
  CreateContactService({
    name,
    number,
    email = "",
    extraInfo = [],
  }: Request): Promise<Contact>;
  CreateOrUpdateContactService({
    name,
    number: rawNumber,
    profilePicUrl,
    isGroup,
    email = "",
    extraInfo = [],
  }: Request): Promise<Contact>;
  DeleteContactService(id: string): Promise<void>;
  GetContactService({ name, number }: Request): Promise<Contact>;
  ListContactsService({
    searchParam = "",
    pageNumber = "1",
  }: Request): Promise<Response>;
  ShowContactService(id: string | number): Promise<Contact>;
  UpdateContactService({ contactData, contactId }: Request): Promise<Contact>;
  //authService
  RefreshTokenService(res: Res, token: string): Promise<Response>;
}
