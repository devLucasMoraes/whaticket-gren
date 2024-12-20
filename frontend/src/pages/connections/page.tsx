import {
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import PageContainer from "../../components/PageContainer";
import WhatsAppModal from "../../components/WhatsAppModal";
import { i18n } from "../../translate/i18n";

export default function Connections() {
  const [selectedWhatsApp, setSelectedWhatsApp] = useState(null);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);

  const handleOpenWhatsAppModal = () => {
    setSelectedWhatsApp(null);
    setWhatsAppModalOpen(true);
  };

  const handleCloseWhatsAppModal = useCallback(() => {
    setWhatsAppModalOpen(false);
    setSelectedWhatsApp(null);
  }, [setSelectedWhatsApp, setWhatsAppModalOpen]);

  return (
    <PageContainer
      title={i18n.t("connections.title")}
      description="Manage your WhatsApp connections"
    >
      <WhatsAppModal
        open={whatsAppModalOpen}
        onClose={handleCloseWhatsAppModal}
        whatsAppId={selectedWhatsApp?.id}
      />
      <Stack spacing={2}>
        <DashboardCard
          title={i18n.t("connections.title")}
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenWhatsAppModal}
            >
              {i18n.t("connections.buttons.add")}
            </Button>
          }
        >
          <Box display="grid" component={Card} elevation={9}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    {i18n.t("connections.table.name")}
                  </TableCell>
                  <TableCell align="center">
                    {i18n.t("connections.table.status")}
                  </TableCell>
                  <TableCell align="center">
                    {i18n.t("connections.table.session")}
                  </TableCell>
                  <TableCell align="center">
                    {i18n.t("connections.table.lastUpdate")}
                  </TableCell>
                  <TableCell align="center">
                    {i18n.t("connections.table.default")}
                  </TableCell>
                  <TableCell align="center">
                    {i18n.t("connections.table.actions")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </Box>
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}
