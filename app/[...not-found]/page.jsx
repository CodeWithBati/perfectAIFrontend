'use client'

import NotFoundPage from "../src/components/NotFound/NotFound"
import withDynamicFavicon from "../src/hoc/withDynamicFavicon"

const NotFound = () => {
  return <NotFoundPage />
}

export default withDynamicFavicon(NotFound)
