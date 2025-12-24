/**
 * Debug Engine - Simple debug output for styling engine
 */

import { parseCSS, getClassNames } from '../engine/cssParser';
import { getPageStyles, PageName } from '../engine';

// Import CSS files as raw strings
import homepageCSS from '~/styles/homepage.css?raw';

/**
 * Debug function to print all engine outputs
 */
export function debugEngine(): void {
  console.log('='.repeat(60));
  console.log('STYLING ENGINE DEBUG OUTPUT');
  console.log('='.repeat(60));

  // Test 1: Raw CSS content
  console.log('\n--- CSS RAW CONTENT ---');
  console.log('Homepage CSS length:', homepageCSS?.length ?? 'NULL');
  console.log('Homepage CSS first 200 chars:', homepageCSS?.substring(0, 200) ?? 'NULL');

  // Test 2: Parsed class names
  console.log('\n--- PARSED CLASS NAMES ---');
  const parsed = parseCSS(homepageCSS, 'debug-homepage');
  const classNames = getClassNames(parsed);
  console.log('Total classes found:', classNames.length);
  console.log('Classes:', classNames);

  // Test 3: Page styles output
  console.log('\n--- PAGE STYLES OUTPUT ---');
  const styles = getPageStyles(PageName.HOMEPAGE);
  console.log('styles.page:', JSON.stringify(styles.page));
  console.log('styles.header:', JSON.stringify(styles.header));
  console.log('styles.title:', JSON.stringify(styles.title));
  console.log('styles.footer:', JSON.stringify(styles.footer));

  // Test 4: Section and nav card styles
  console.log('\n--- SECTION STYLES ---');
  console.log('styles.sections keys:', Object.keys(styles.sections));

  const appsNav = styles.sections.appsNav;
  console.log('appsNav.container:', JSON.stringify(appsNav?.container));
  console.log('appsNav.navCardSection:', JSON.stringify(appsNav?.navCardSection));

  if (appsNav?.navCardSection?.navCardStylesSet) {
    const ncs = appsNav.navCardSection.navCardStylesSet;
    console.log('\n--- NAV CARD STYLES SET ---');
    console.log('navCardStyles:', JSON.stringify(ncs.navCardStyles));
    console.log('buttonStyles:', JSON.stringify(ncs.buttonStyles));
    console.log('paraStyles:', JSON.stringify(ncs.paraStyles));
  }

  console.log('\n' + '='.repeat(60));
  console.log('DEBUG COMPLETE');
  console.log('='.repeat(60));
}

// Export for use in test page
export default debugEngine;
