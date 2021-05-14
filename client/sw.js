self.addEventListener('push', (e) => {
	const data = e.data.json();
	self.registration.showNotification(data.title, {
		body: data.body,
		icon: data.icon,
		data: data.data,
		image: data.image,
		tag: data.tag,
		requireInteraction: data.requireInteraction,
		renotify: data.renotify,
		actions: data.actions
	});
});
self.addEventListener('notificationclick', function (event) {
	const url = event.action ? event.action : event.notification.data.url;
	if (url) {
		event.notification.close();
		event.waitUntil(clients.openWindow(url));
	}
});
