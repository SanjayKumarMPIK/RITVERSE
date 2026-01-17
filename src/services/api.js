const API_BASE_URL = 'https://students-persona-backend.onrender.com';

export const api = {
  async getQuestions() {
    const response = await fetch(`${API_BASE_URL}/question/start`);
    if (!response.ok) {
      let errorMessage = 'Failed to fetch questions';
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  async submitQuiz(student, answers) {
    const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student,
        answers,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to submit quiz';
      try {
        const error = await response.json();
        if (Array.isArray(error.message)) {
          errorMessage = error.message.join(', ');
        } else if (error.message) {
          errorMessage = error.message;
        }
      } catch (e) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },
};

