import {enableValidation, validationconfig} from '../components/validate.js'
enableValidation(validationconfig);

import {initial} from '../components/card.js';
initial();

import {setEventListeners} from "../components/modal"

setEventListeners();

import "../src/index.css";