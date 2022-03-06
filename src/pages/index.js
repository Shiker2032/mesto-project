import {enableValidation, validationconfig} from '../../src/components/validate.js'
enableValidation(validationconfig);

import {initial} from '../../src/components/card.js';
initial();

import {setEventListeners} from "../../src/components/modal"

setEventListeners();

import "../pages/index.css";