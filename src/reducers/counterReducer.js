const initialState = {
  token: '',
  loading: false,
  user: null,
  repos: [],
  pullRequests: [],
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GITHUB_TOKEN_SUCCESS':
      return { ...state, token: action.payload, loading: false };
    case 'GITHUB_TOKEN_FAILURE':
      return { ...state, error: action.payload };
    case 'GITHUB_TOKEN_REQUEST':
      return { ...state, loading: true };
    case 'GITHUB_USER_SUCCESS':
      return { ...state, user: action.payload };
    case 'GITHUB_REPO_SUCCESS':
      return { ...state, repos: action.payload };
    case 'GITHUB_PR_SUCCESS':
      return { ...state, pullRequests: action.payload };
    case 'GITHUB_COMMITS_SUCCESS':
      return { ...state, commits: action.payload };
    default:
      return state;
  }
};

export default counterReducer;
