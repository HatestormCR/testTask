import { createSelector } from 'reselect';
import { prop, defaultTo } from 'ramda';

export const getData = createSelector(prop('data'), defaultTo([]));
export const getLoading = createSelector(prop('loading'), defaultTo(false));
export const getError = createSelector(prop('error'), defaultTo(''));
export const getSort = createSelector(prop('sort'), defaultTo(false));
