const externalProtocolPattern = /^(?:[a-z][a-z\d+.-]*:)?\/\//i
const specialProtocolPattern = /^(?:mailto|tel):/i

export const withBaseHref = (href) => {
  if (!href || href.startsWith('#') || externalProtocolPattern.test(href) || specialProtocolPattern.test(href)) {
    return href
  }

  const base = import.meta.env.BASE_URL || '/'

  if (!href.startsWith('/')) {
    return href
  }

  if (base === '/') {
    return href
  }

  return `${base.replace(/\/$/, '')}${href}`
}
