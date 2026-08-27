import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { useSiteLanguage } from '@/app/providers/SiteLanguageProvider';
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE_URL } from '@/shared/config/app';
import { getLegalContent } from '@/shared/legal/content';
import { seoCopy } from '@/shared/seo/seo-copy';

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function setCanonical(url: string | null) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!url) {
    link?.remove();
    return;
  }

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = url;
}

function joinUrl(origin: string, pathname: string) {
  return `${origin.replace(/\/$/, '')}${pathname === '/' ? '/' : pathname}`;
}

function setStructuredData(data: Record<string, unknown> | null) {
  let script = document.head.querySelector<HTMLScriptElement>('script[data-vocab-seo="structured-data"]');

  if (!data) {
    script?.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.vocabSeo = 'structured-data';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export function SeoManager() {
  const location = useLocation();
  const { language: appLanguage } = useAppLanguage();
  const { language: siteLanguage } = useSiteLanguage();

  useEffect(() => {
    const pathname = location.pathname;
    const isPrivateApp = pathname === '/app' || pathname.startsWith('/app/');
    const language = isPrivateApp ? appLanguage : siteLanguage;
    const copy = seoCopy[language] ?? seoCopy.en;
    const legal = getLegalContent(language);

    let title = copy.home.title;
    let description = copy.home.description;
    let robots = 'index, follow';
    let indexable = true;

    if (pathname === '/about') {
      title = `${legal.about.title} | ${SITE_NAME}`;
      description = legal.about.intro;
    } else if (pathname === '/contact') {
      title = `${legal.contact.title} | ${SITE_NAME}`;
      description = legal.contact.intro;
    } else if (pathname === '/privacy') {
      title = `${legal.privacy.title} | ${SITE_NAME}`;
      description = legal.privacy.sections[0]?.[1] ?? copy.home.description;
    } else if (pathname === '/terms') {
      title = `${legal.terms.title} | ${SITE_NAME}`;
      description = legal.terms.sections[0]?.[1] ?? copy.home.description;
    } else if (pathname === '/login') {
      title = copy.login.title;
      description = copy.login.description;
      robots = 'noindex, follow';
      indexable = false;
    } else if (pathname === '/register') {
      title = copy.register.title;
      description = copy.register.description;
      robots = 'noindex, follow';
      indexable = false;
    } else if (pathname === '/forgot-password') {
      title = copy.forgotPassword.title;
      description = copy.forgotPassword.description;
      robots = 'noindex, follow';
      indexable = false;
    } else if (pathname === '/reset-password') {
      title = copy.resetPassword.title;
      description = copy.resetPassword.description;
      robots = 'noindex, nofollow';
      indexable = false;
    } else if (isPrivateApp) {
      title = copy.app.title;
      description = copy.app.description;
      robots = 'noindex, nofollow';
      indexable = false;
    } else if (pathname !== '/') {
      robots = 'noindex, follow';
      indexable = false;
    }

    document.title = title;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', robots);

    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', language);

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', SOCIAL_IMAGE_URL ? 'summary_large_image' : 'summary');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (SOCIAL_IMAGE_URL && indexable) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', SOCIAL_IMAGE_URL);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', SOCIAL_IMAGE_URL);
    } else {
      removeMeta('meta[property="og:image"]');
      removeMeta('meta[name="twitter:image"]');
    }

    const canonicalUrl = SITE_URL && indexable ? joinUrl(SITE_URL, pathname) : null;
    setCanonical(canonicalUrl);

    if (canonicalUrl) {
      setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    } else {
      removeMeta('meta[property="og:url"]');
    }

    if (pathname === '/' && SITE_URL) {
      setStructuredData({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: copy.home.description,
        inLanguage: language,
      });
    } else {
      setStructuredData(null);
    }
  }, [appLanguage, siteLanguage, location.pathname]);

  return null;
}
