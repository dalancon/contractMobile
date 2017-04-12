/*
 *
 *  actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCHPREVIEW_ACTION,
  SETPREVIEW_ACTION,
  FETCHSOURCE_ACTION,
  SETSOURCE_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchPreview(file) {
  return {
    type: FETCHPREVIEW_ACTION,
    file,
  };
}

export function setPreview(preview) {
  return {
    type: SETPREVIEW_ACTION,
    preview,
  };
}

export function fetchSource(path) {
  return {
    type: FETCHSOURCE_ACTION,
    path,
  }
}

export function setSource(source) {
  return {
    type: SETSOURCE_ACTION,
    source,
  }
}