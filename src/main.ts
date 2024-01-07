import 'reflect-metadata';
import {Component} from './types/component.js';
import Application from './app/application.js';
import {Container} from 'inversify';
import {createUserContainer} from './modules/user/user.container.js';
import {createApplicationContainer} from './app/api.container.js';
import {createOfferContainer} from './modules/offer/offer.container.js';
import {createCommentContainer} from './modules/comments/comment.container.js';

const mainContainer = Container.merge(createApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer());

const application = mainContainer.get<Application>(Component.Application);

await application.init();
