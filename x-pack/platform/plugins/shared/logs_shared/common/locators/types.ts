/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { LocatorPublic } from '@kbn/share-plugin/common';
import type { LogsLocatorParams } from './logs_locator';

export interface LogsSharedLocators {
  logsLocator: LocatorPublic<LogsLocatorParams>;
}
