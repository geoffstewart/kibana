/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { lazy, Suspense } from 'react';
import { EuiLoadingSpinner } from '@elastic/eui';
import { SecuritySolutionPageWrapper } from '../../common/components/page_wrapper';

const AssetInventoryLazy = lazy(() => import('../components/app'));

export const AssetInventoryContainer = React.memo(() => {
  return (
    <SecuritySolutionPageWrapper noPadding>
      <Suspense fallback={<EuiLoadingSpinner />}>
        <AssetInventoryLazy />
      </Suspense>
    </SecuritySolutionPageWrapper>
  );
});

AssetInventoryContainer.displayName = 'AssetInventoryContainer';
