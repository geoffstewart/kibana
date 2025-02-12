/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { DocLinksServiceSetup } from '@kbn/core/server';
import type { CaseRoute } from '../types';

import { CASE_STATUS_URL } from '../../../../common/constants';
import { createCaseError } from '../../../common/error';
import { createCasesRoute } from '../create_cases_route';
import type { statsApiV1 } from '../../../../common/types/api';
import { DEFAULT_CASES_ROUTE_SECURITY } from '../constants';

/**
 * @deprecated since version 8.1.0
 */
export const getStatusRoute = ({
  isServerless,
  docLinks,
}: {
  isServerless?: boolean;
  docLinks: DocLinksServiceSetup;
}): CaseRoute =>
  createCasesRoute({
    method: 'get',
    path: CASE_STATUS_URL,
    security: DEFAULT_CASES_ROUTE_SECURITY,
    options: { deprecated: true },
    routerOptions: {
      access: isServerless ? 'internal' : 'public',
      summary: `Get case status summary`,
      tags: ['oas-tag:cases'],
      description:
        'Returns the number of cases that are open, closed, and in progress in the default space.',
      // You must have `read` privileges for the **Cases** feature in the **Management**, **Observability**, or **Security** section of the Kibana feature privileges, depending on the owner of the cases you're seeking.
      deprecated: {
        documentationUrl: docLinks.links.cases.legacyApiDeprecations,
        severity: 'warning',
        reason: {
          type: 'remove',
        },
      },
    },
    handler: async ({ context, request, response }) => {
      try {
        const caseContext = await context.cases;
        const client = await caseContext.getCasesClient();

        const res: statsApiV1.CasesStatusResponse = await client.metrics.getStatusTotalsByType(
          request.query as statsApiV1.CasesStatusRequest
        );

        return response.ok({
          body: res,
        });
      } catch (error) {
        throw createCaseError({
          message: `Failed to get status stats in route: ${error}`,
          error,
        });
      }
    },
  });
