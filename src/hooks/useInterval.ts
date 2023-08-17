import { useEffect } from 'react'

const useInterval = (callback: VoidFunction, interval: number) => {
  useEffect(() => {
    let lastTimestamp = 0

    function loop(timestamp: number) {
      if (timestamp - lastTimestamp >= interval) {
        callback()
        lastTimestamp = timestamp
      }

      requestAnimationFrame(loop)
    }

    const requestId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(requestId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useInterval
