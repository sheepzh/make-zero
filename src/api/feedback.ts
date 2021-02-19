import request from './base'

class FeedbackDate {
  message: string
  contact: string
}

/**
 * Send feedback
 * 
 * @param data data
 */
export function sendFeedback(data: FeedbackDate) {
  return request({ url: '/feedback', method: 'PUT', data })
}