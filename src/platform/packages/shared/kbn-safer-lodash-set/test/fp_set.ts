/*
 * Elasticsearch B.V licenses this file to you under the MIT License.
 * See `src/platform/packages/shared/kbn-safer-lodash-set/LICENSE` for more information.
 */

import { expectType } from 'tsd';
import set from '../fp/set';

const someObj: object = {};
const anyValue: any = 'any value';

expectType<object>(set('a.b.c', anyValue, someObj));
expectType<object>(set('a.b.c')(anyValue, someObj));
expectType<object>(set('a.b.c')(anyValue)(someObj));
expectType<object>(set('a.b.c', anyValue)(someObj));

expectType<object>(set(['a.b.c'], anyValue, someObj));
expectType<object>(set(['a.b.c'])(anyValue, someObj));
expectType<object>(set(['a.b.c'])(anyValue)(someObj));
expectType<object>(set(['a.b.c'], anyValue)(someObj));

expectType<object>(set(['a.b.c', 2, Symbol('hep')], anyValue, someObj));
expectType<object>(set(['a.b.c', 2, Symbol('hep')])(anyValue, someObj));
expectType<object>(set(['a.b.c', 2, Symbol('hep')])(anyValue)(someObj));
expectType<object>(set(['a.b.c', 2, Symbol('hep')], anyValue)(someObj));
