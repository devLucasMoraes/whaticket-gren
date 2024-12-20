import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../api";
import { useAlert } from "../../hooks/useAlert";
import { i18n } from "../../translate/i18n";
import QueueSelect from "../QueueSelect";

const sessionSchema = z.object({
  name: z.string().min(2, "Too Short!").max(50, "Too Long!"),
  greetingMessage: z.string().optional(),
  farewellMessage: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export default function WhatsAppModal({ open, onClose, whatsAppId }) {
  const alert = useAlert();

  alert.error("err");

  const initialState = {
    name: "",
    greetingMessage: "",
    farewellMessage: "",
    isDefault: false,
  };

  const [selectedQueueIds, setSelectedQueueIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: initialState,
  });

  useEffect(() => {
    const fetchSession = async () => {
      if (!whatsAppId) return;

      try {
        const { data } = await api.get(`whatsapp/${whatsAppId}`);
        reset(data);

        const whatsQueueIds = data.queues?.map((queue) => queue.id);
        setSelectedQueueIds(whatsQueueIds);
      } catch (err) {
        alert.error(err);
      }
    };
    fetchSession();
  }, [whatsAppId, reset]);

  const handleSaveWhatsApp = async (values) => {
    setIsSubmitting(true);
    const whatsappData = { ...values, queueIds: selectedQueueIds };

    try {
      if (whatsAppId) {
        await api.put(`/whatsapp/${whatsAppId}`, whatsappData);
      } else {
        await api.post("/whatsapp", whatsappData);
      }
      alert.success(i18n.t("whatsappModal.success"));
      handleClose();
    } catch (err) {
      alert.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    reset(initialState);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        {whatsAppId
          ? i18n.t("whatsappModal.title.edit")
          : i18n.t("whatsappModal.title.add")}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleSaveWhatsApp)}>
        <DialogContent dividers>
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={i18n.t("whatsappModal.form.name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                  margin="dense"
                  autoFocus
                />
              )}
            />
            <Controller
              name="isDefault"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={value}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label={i18n.t("whatsappModal.form.default")}
                />
              )}
            />
          </div>
          <Controller
            name="greetingMessage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={i18n.t("queueModal.form.greetingMessage")}
                multiline
                rows={5}
                fullWidth
                error={!!errors.greetingMessage}
                helperText={errors.greetingMessage?.message}
                variant="outlined"
                margin="dense"
              />
            )}
          />
          <Controller
            name="farewellMessage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={i18n.t("whatsappModal.form.farewellMessage")}
                multiline
                rows={5}
                fullWidth
                error={!!errors.farewellMessage}
                helperText={errors.farewellMessage?.message}
                variant="outlined"
                margin="dense"
              />
            )}
          />
          <QueueSelect
            selectedQueueIds={selectedQueueIds}
            onChange={(selectedIds) => setSelectedQueueIds(selectedIds)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="inherit"
            disabled={isSubmitting}
            variant="outlined"
          >
            {i18n.t("whatsappModal.buttons.cancel")}
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isSubmitting}
            variant="contained"
          >
            {whatsAppId
              ? i18n.t("whatsappModal.buttons.okEdit")
              : i18n.t("whatsappModal.buttons.okAdd")}
            {isSubmitting && <CircularProgress size={24} />}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
