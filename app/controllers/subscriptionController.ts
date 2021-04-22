import { NextFunction, Request, Response } from "express";
import * as subscriptionRepository from "../repositories/subscriptionRepository";
import webpush, { SendResult } from "web-push";

export const post = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscription = req.body;

    const newSubscription = await subscriptionRepository.create(subscription);

    // Send 201 - resource created
    res.status(201).json(newSubscription);
  } catch (e) {
    next(e);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const endpoint: string = req.query.endpoint?.toString();
    if (!endpoint) {
      res.sendStatus(400);
      return;
    }

    const successful = await subscriptionRepository.deleteByEndpoint(endpoint);
    if (successful) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    next(e);
  }
};

export const broadcast = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notification = {
      title: "Title push notification by Gamanza!",
      body: "Body push notification by Gamanza!😀 ",
      icon: 
      "https://storage.googleapis.com/pasino-strapi/casinogame/d89c604693be46a89b72b283bdf5fdc5.jpg",
      //"https://via.placeholder.com/360x240.png?text=Imagen",
      data:{url:"https://gamanza.com/",url1:"https://www.funcasinonights.com/",url2:"https://www.igamingsuppliers.com/vendor/gamanza-group/"},
      requireInteraction: true,
      image:
        "https://firebasestorage.googleapis.com/v0/b/crm-jackpots.appspot.com/o/jp-dev%2Ftemplates%2Fterry-vlisidis-vPQbo1D7Eco-unsplash.jpg?alt=media&token=6ab96f10-feb8-4763-942b-b54cea224ee6",
        //"https://via.placeholder.com/360x240.png?text=Imagen",
        action1:"OPEN-URL1",
        title1:"Event😀",
        icon1: "https://img.icons8.com/ios/2x/tear-off-calendar--v2.png",
        action2:"OPEN-URL2",
        title2:"Home",
        icon2: "https://img.icons8.com/cotton/2x/home.png",
    };

    const subscriptions = await subscriptionRepository.getAll();

    const notifications: Promise<SendResult>[] = [];
    subscriptions.forEach((subscription) => {
      notifications.push(
        webpush.sendNotification(subscription, JSON.stringify(notification))
      );
    });

    await Promise.all(notifications).catch(async reason=>
      {
        if(reason.statusCode==410|| reason.statusCode==404){
        await subscriptionRepository.deleteByEndpoint(reason.endpoint)
      }});
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
