import useEventEmitter from "@/hooks/utils/useEventEmitter";
import events from "@/json/events/events";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "sonner";

export default function EventListeners() {
  const showNotifications = useCallback(
    (data: { message: string; variant: string }) => {
      if (data.variant === "error") {
        toast.error(data.message);
      }

      if (data.variant === "success") {
        toast.success(data.message);
      }

      if (data.variant === "warning") {
        toast.error(data.message);
      }
    },
    []
  );

  const router = useRouter();
  const handleRoutes = useCallback((pathName: string) => {
    router.push(pathName);
  }, []);

  useEventEmitter(events.showNotification, showNotifications);
  useEventEmitter(events.routerPush, handleRoutes);

  return null;
}
