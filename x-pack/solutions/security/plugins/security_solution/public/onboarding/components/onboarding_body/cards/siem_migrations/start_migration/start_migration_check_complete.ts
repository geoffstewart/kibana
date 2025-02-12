/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { SiemMigrationTaskStatus } from '../../../../../../../common/siem_migrations/constants';
import type { OnboardingCardCheckComplete } from '../../../../../types';

export const checkStartMigrationCardComplete: OnboardingCardCheckComplete = async ({
  siemMigrations,
}) => {
  const migrationsStats = await siemMigrations.rules.getRuleMigrationsStats();
  const isComplete = migrationsStats.some(
    (migrationStats) => migrationStats.status === SiemMigrationTaskStatus.FINISHED
  );
  return isComplete;
};
