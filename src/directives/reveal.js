const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getOptions = (binding) => {
  if (typeof binding.value === 'number') {
    return { delay: binding.value }
  }

  if (typeof binding.value === 'string') {
    return { variant: binding.value }
  }

  return binding.value ?? {}
}

const revealElement = (element) => {
  element.classList.add('is-revealed')
}

const reveal = {
  mounted(element, binding) {
    const options = getOptions(binding)
    const delay = Number(options.delay) || 0

    element.classList.add('reveal-prepare')
    element.dataset.reveal = options.variant ?? element.dataset.reveal ?? 'up'

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      revealElement(element)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        element.__revealTimer = window.setTimeout(() => revealElement(element), delay)
        observer.unobserve(element)
      },
      {
        rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
        threshold: options.threshold ?? 0.16,
      },
    )

    element.__revealObserver = observer
    observer.observe(element)
  },

  unmounted(element) {
    if (element.__revealTimer) {
      window.clearTimeout(element.__revealTimer)
      delete element.__revealTimer
    }

    element.__revealObserver?.disconnect()
    delete element.__revealObserver
  },
}

export default reveal
