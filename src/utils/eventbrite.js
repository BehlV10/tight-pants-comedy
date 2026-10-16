// Eventbrite embedded checkout widget utility
// Leverages official window.EBWidgets to open secure in-page checkout modal without leaving the site

export function initEventbriteWidget(triggerElementId, eventId) {
  if (!triggerElementId || !eventId) return;

  const tryInit = () => {
    if (typeof window !== 'undefined' && window.EBWidgets && typeof window.EBWidgets.createWidget === 'function') {
      const el = document.getElementById(triggerElementId);
      if (!el) return false;

      try {
        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: eventId,
          modal: true,
          modalTriggerElementId: triggerElementId,
          onOrderComplete: () => {
            console.log(`[Eventbrite] Order complete for event ${eventId}`);
          }
        });
        return true;
      } catch (err) {
        console.warn('[Eventbrite] Widget init error:', err);
        return false;
      }
    }
    return false;
  };

  // If already available, mount immediately
  if (!tryInit()) {
    // Retry periodically until eb_widgets.js loads
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (tryInit() || attempts >= 25) {
        clearInterval(interval);
      }
    }, 200);
  }
}
