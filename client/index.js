// Check if service workers are supported
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/',
  });
}
//  const myModal = new bootstrap.Modal(document.getElementById('myModal'), {
//    keyboard: false
//  });
const publicVapidKey = 'BJU2OuUfxn0z3CWPOJ98DRoTvqyfLlZi5S2BQtnxJgJp_4KDzw6WxngOnOvfiqI04b_W9RGTQcFQdSZPE85MJSM';

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const getSubscribedElement = () => document.getElementById('subscribed');
const getUnsubscribedElement = () => document.getElementById('unsubscribed');
const getdivSubscribeElement = () => document.getElementById('divSubscription');
//const getmodalElement = () => document.getElementById('myModal');

const checkStatus = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const permissionState = await registration.pushManager.permissionState({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    let subscription = await registration.pushManager.getSubscription();
    switch (permissionState) {
      case 'denied':
        if (subscription) {
          await unsubscribe(subscription);
        }
        break;
      case 'granted':
        if (!subscription) {
          subscription = await subscribe();
        }
        break;
      case 'prompt':
        if (!subscription) {
          subscription = await subscribe();
        }
        //myModal.show()
        break;
    }
    await getState(subscription);
  } catch (error) {
    console.log(error)
  }

};
// const close = async () => {
//   myModal.hide()
// };
const getState = async (subscription) => {
  getSubscribedElement().setAttribute('style', `display: ${subscription ? 'block' : 'none'};`);
  getUnsubscribedElement().setAttribute('style', `display: ${subscription ? 'none' : 'block'};`);
  var personDiv = document.createElement("div");
  var div1 = document.createElement("div");
  var text1 = document.createTextNode(JSON.stringify(subscription));
  div1.appendChild(text1);
  personDiv.appendChild(div1);
  getdivSubscribeElement().appendChild(personDiv);
};

const subscribe = async () => {
  //myModal.hide()
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;

  // Subscribe to push notifications
  const subscription1 = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  // const response = await fetch('/subscription', {
  //   method: 'POST',
  //   body: JSON.stringify(subscription1),
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  // });

  // if (response.ok) {
  //   return subscription1;
  // }else{
  //   return rull;
  // }
  return subscription1;
};

const unsubscribe = async (subscription) => {

  // const { endpoint } = subscription;
  // const response = await fetch(`/subscription?endpoint=${endpoint}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  // });

  // if (response.ok) {
  //   await subscription.unsubscribe();
  // }
  await subscription.unsubscribe();
};

// window.broadcast = async () => {
//   await fetch('/broadcast', {
//     method: 'GET',
//     headers: {
//       'content-type': 'application/json',
//     },
//   });
// };

checkStatus();