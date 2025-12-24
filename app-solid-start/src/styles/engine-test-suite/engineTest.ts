/**
 * Engine Test Suite
 * Tests the styling engine to verify CSS parsing and style generation
 */

import { parseCSS, getClassNames, type ParsedCSS } from '../engine/cssParser';
import { getPageStyles, PageName, type PageStylesModule } from '../engine';

// Import CSS files as raw strings for testing
import homepageCSS from '~/styles/homepage.css?raw';
import commonCSS from '~/styles/common.css?raw';
import appsCSS from '~/styles/apps.css?raw';
import blogCSS from '~/styles/blog.css?raw';
import missionCSS from '~/styles/mission.css?raw';

export interface TestResult {
  testName: string;
  passed: boolean;
  message: string;
  data?: unknown;
}

/**
 * Test 1: Verify CSS raw imports are working
 */
export function testCSSImports(): TestResult {
  const results = {
    homepage: homepageCSS?.length ?? 0,
    common: commonCSS?.length ?? 0,
    apps: appsCSS?.length ?? 0,
    blog: blogCSS?.length ?? 0,
    mission: missionCSS?.length ?? 0,
  };

  const allHaveContent = Object.values(results).every((len) => len > 0);

  return {
    testName: 'CSS Raw Imports',
    passed: allHaveContent,
    message: allHaveContent
      ? 'All CSS files imported successfully'
      : 'Some CSS files are empty or failed to import',
    data: results,
  };
}

/**
 * Test 2: Verify CSS parser extracts class names
 */
export function testCSSParser(): TestResult {
  const parsed: ParsedCSS = parseCSS(homepageCSS, 'test-homepage');
  const classNames: string[] = getClassNames(parsed);

  const expectedClasses = [
    'homepage',
    'home-header',
    'home-title',
    'apps-nav-section',
    'nav-card-section',
    'nav-card',
    'nav-card-link',
    'nav-card-para',
    'home-footer',
  ];

  const foundClasses = expectedClasses.filter((cls) => classNames.includes(cls));
  const missingClasses = expectedClasses.filter((cls) => !classNames.includes(cls));

  return {
    testName: 'CSS Parser',
    passed: missingClasses.length === 0,
    message:
      missingClasses.length === 0
        ? `Found all ${expectedClasses.length} expected classes`
        : `Missing classes: ${missingClasses.join(', ')}`,
    data: {
      totalClassesFound: classNames.length,
      allClassesFound: classNames,
      expectedClasses,
      foundClasses,
      missingClasses,
    },
  };
}

/**
 * Test 3: Verify getPageStyles returns valid structure
 */
export function testGetPageStyles(): TestResult {
  const styles: PageStylesModule = getPageStyles(PageName.HOMEPAGE);

  const checks = {
    hasPage: 'page' in styles && Object.keys(styles.page).length > 0,
    hasHeader: 'header' in styles && Object.keys(styles.header).length > 0,
    hasTitle: 'title' in styles && Object.keys(styles.title).length > 0,
    hasSections: 'sections' in styles && Object.keys(styles.sections).length > 0,
    hasFooter: 'footer' in styles && Object.keys(styles.footer).length > 0,
    hasAppsNavSection: 'appsNav' in styles.sections,
    hasNavCardSection:
      styles.sections.appsNav?.navCardSection !== undefined,
    hasNavCardStylesSet:
      styles.sections.appsNav?.navCardSection?.navCardStylesSet !== undefined,
  };

  const allPassed = Object.values(checks).every((v) => v === true);
  const failedChecks = Object.entries(checks)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  return {
    testName: 'getPageStyles Structure',
    passed: allPassed,
    message: allPassed
      ? 'PageStylesModule has valid structure'
      : `Failed checks: ${failedChecks.join(', ')}`,
    data: {
      checks,
      styles,
    },
  };
}

/**
 * Test 4: Verify StylesKV values are correct
 */
export function testStylesKVValues(): TestResult {
  const styles: PageStylesModule = getPageStyles(PageName.HOMEPAGE);

  const pageStylesKV = styles.page;
  const headerStylesKV = styles.header;
  const navCardStylesKV = styles.sections.appsNav?.navCardSection?.navCardStylesSet;

  const checks = {
    pageHasHomepageClass: pageStylesKV['homepage'] === true,
    headerHasHomeHeaderClass: headerStylesKV['home-header'] === true,
    navCardHasNavCardClass: navCardStylesKV?.navCardStyles['nav-card'] === true,
    navCardHasButtonClass: navCardStylesKV?.buttonStyles['nav-card-link'] === true,
    navCardHasParaClass: navCardStylesKV?.paraStyles['nav-card-para'] === true,
  };

  const allPassed = Object.values(checks).every((v) => v === true);
  const failedChecks = Object.entries(checks)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  return {
    testName: 'StylesKV Values',
    passed: allPassed,
    message: allPassed
      ? 'All StylesKV values are correct'
      : `Failed checks: ${failedChecks.join(', ')}`,
    data: {
      checks,
      pageStylesKV,
      headerStylesKV,
      navCardStylesKV,
    },
  };
}

/**
 * Test 5: Verify all page builders work
 */
export function testAllPageBuilders(): TestResult {
  const results: Record<string, { success: boolean; error?: string }> = {};

  for (const pageName of Object.values(PageName)) {
    try {
      const styles = getPageStyles(pageName);
      results[pageName] = {
        success:
          styles !== null &&
          styles !== undefined &&
          Object.keys(styles).length > 0,
      };
    } catch (error) {
      results[pageName] = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  const allPassed = Object.values(results).every((r) => r.success);

  return {
    testName: 'All Page Builders',
    passed: allPassed,
    message: allPassed
      ? 'All page builders executed successfully'
      : 'Some page builders failed',
    data: results,
  };
}

/**
 * Run all tests and return results
 */
export function runAllTests(): TestResult[] {
  return [
    testCSSImports(),
    testCSSParser(),
    testGetPageStyles(),
    testStylesKVValues(),
    testAllPageBuilders(),
  ];
}

/**
 * Format test results for console output
 */
export function formatTestResults(results: TestResult[]): string {
  const lines: string[] = [
    '========================================',
    '  STYLING ENGINE TEST RESULTS',
    '========================================',
    '',
  ];

  let passedCount = 0;
  let failedCount = 0;

  for (const result of results) {
    const status = result.passed ? '✓ PASS' : '✗ FAIL';
    lines.push(`${status}: ${result.testName}`);
    lines.push(`       ${result.message}`);

    if (!result.passed && result.data) {
      lines.push(`       Data: ${JSON.stringify(result.data, null, 2)}`);
    }

    lines.push('');

    if (result.passed) {
      passedCount++;
    } else {
      failedCount++;
    }
  }

  lines.push('----------------------------------------');
  lines.push(`Total: ${passedCount} passed, ${failedCount} failed`);
  lines.push('========================================');

  return lines.join('\n');
}

// Export a function to run tests and log results
export function runAndLogTests(): void {
  const results = runAllTests();
  console.log(formatTestResults(results));

  // Also log detailed data for debugging
  console.log('\n--- Detailed Test Data ---\n');
  for (const result of results) {
    console.log(`\n${result.testName}:`);
    console.log(JSON.stringify(result.data, null, 2));
  }
}
