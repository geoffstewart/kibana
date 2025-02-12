/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { z } from '@kbn/zod';
import { notFound, internal } from '@hapi/boom';
import { ListStreamsResponse } from '@kbn/streams-schema';
import { createServerRoute } from '../create_server_route';
import { DefinitionNotFound } from '../../lib/streams/errors';
import { listStreams } from '../../lib/streams/stream_crud';

export const listStreamsRoute = createServerRoute({
  endpoint: 'GET /api/streams',
  options: {
    access: 'internal',
  },
  security: {
    authz: {
      enabled: false,
      reason:
        'This API delegates security to the currently logged in user and their Elasticsearch permissions.',
    },
  },
  params: z.object({}),
  handler: async ({ request, getScopedClients }): Promise<ListStreamsResponse> => {
    try {
      const { scopedClusterClient } = await getScopedClients({ request });
      return await listStreams({ scopedClusterClient });
    } catch (e) {
      if (e instanceof DefinitionNotFound) {
        throw notFound(e);
      }

      throw internal(e);
    }
  },
});
