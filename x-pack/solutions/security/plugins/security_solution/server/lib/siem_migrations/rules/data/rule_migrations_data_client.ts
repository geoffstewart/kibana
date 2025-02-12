/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { IScopedClusterClient, Logger } from '@kbn/core/server';
import type { PackageService } from '@kbn/fleet-plugin/server';
import { RuleMigrationsDataIntegrationsClient } from './rule_migrations_data_integrations_client';
import { RuleMigrationsDataPrebuiltRulesClient } from './rule_migrations_data_prebuilt_rules_client';
import { RuleMigrationsDataResourcesClient } from './rule_migrations_data_resources_client';
import { RuleMigrationsDataRulesClient } from './rule_migrations_data_rules_client';
import { RuleMigrationsDataLookupsClient } from './rule_migrations_data_lookups_client';
import type { AdapterId } from './rule_migrations_data_service';

export type IndexNameProvider = () => Promise<string>;
export type IndexNameProviders = Record<AdapterId, IndexNameProvider>;

export class RuleMigrationsDataClient {
  public readonly rules: RuleMigrationsDataRulesClient;
  public readonly resources: RuleMigrationsDataResourcesClient;
  public readonly integrations: RuleMigrationsDataIntegrationsClient;
  public readonly prebuiltRules: RuleMigrationsDataPrebuiltRulesClient;
  public readonly lookups: RuleMigrationsDataLookupsClient;

  constructor(
    indexNameProviders: IndexNameProviders,
    username: string,
    esScopedClient: IScopedClusterClient,
    logger: Logger,
    packageService?: PackageService
  ) {
    this.rules = new RuleMigrationsDataRulesClient(
      indexNameProviders.rules,
      username,
      esScopedClient.asInternalUser,
      logger
    );
    this.resources = new RuleMigrationsDataResourcesClient(
      indexNameProviders.resources,
      username,
      esScopedClient.asInternalUser,
      logger
    );
    this.integrations = new RuleMigrationsDataIntegrationsClient(
      indexNameProviders.integrations,
      username,
      esScopedClient.asInternalUser,
      logger,
      packageService
    );
    this.prebuiltRules = new RuleMigrationsDataPrebuiltRulesClient(
      indexNameProviders.prebuiltrules,
      username,
      esScopedClient.asInternalUser,
      logger
    );
    this.lookups = new RuleMigrationsDataLookupsClient(
      username,
      esScopedClient.asCurrentUser,
      logger
    );
  }
}
