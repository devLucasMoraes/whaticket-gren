import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { useAlert } from "../../hooks/useAlert";
import { i18n } from "../../translate/i18n";

export default function QueueSelect({ selectedQueueIds, onChange }) {
  const alert = useAlert();

  const [queues, setQueues] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/queue");
        setQueues(data);
      } catch (err) {
        alert.error(err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ marginTop: 6 }}>
      <FormControl fullWidth margin="dense" variant="outlined">
        <InputLabel>{i18n.t("queueSelect.inputLabel")}</InputLabel>
        <Select
          multiple
          value={selectedQueueIds}
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
          renderValue={(selected) => (
            <div>
              {selected?.length > 0 &&
                selected.map((id) => {
                  const queue = queues.find((q) => q.id === id);
                  return queue ? (
                    <Chip
                      key={id}
                      style={{ backgroundColor: queue.color }}
                      variant="outlined"
                      label={queue.name}
                    />
                  ) : null;
                })}
            </div>
          )}
        >
          {queues.map((queue) => (
            <MenuItem key={queue.id} value={queue.id}>
              {queue.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
