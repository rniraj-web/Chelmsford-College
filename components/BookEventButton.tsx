"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./Button";
import { Alert } from "./Alert";

export function BookEventButton({
  bookingUrl,
  eventTitle,
}: {
  bookingUrl: string | null;
  eventTitle: string;
}) {
  const [booked, setBooked] = useState(false);

  if (bookingUrl) {
    return (
      <Button href={bookingUrl} variant="primary" size="large">
        Book your place
      </Button>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {booked ? (
        <motion.div
          key="confirmed"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <Alert tone="success" title="You're booked in">
            We&apos;ve reserved your place at {eventTitle}. This is a prototype
            booking, no real reservation has been made and no email will be
            sent.
          </Alert>
        </motion.div>
      ) : (
        <motion.div
          key="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={() => setBooked(true)}
          >
            Book your place
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
