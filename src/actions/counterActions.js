import { fetchCommits, fetchGithubPR, fetchGithubToken, fetchRepos, fetchUser } from "../services/githubService"

export const fetchTokenSuccess = (token) => {
    return {
        type: 'GITHUB_TOKEN_SUCCESS',
        payload: token
    }
}

export const fetchTokenFailure = (error) => {
    return {
        type: 'GITHUB_TOKEN_FAILURE',
        payload: error
    }
}

export const getUser = (token) => {
    return async (dispatch) => {
        dispatch({ type: 'GITHUB_USER_REQUEST' });
        try {
            const response = await fetchUser(token);
            dispatch({ type: 'GITHUB_USER_SUCCESS', payload: response });
            dispatch(getRepos());
        } catch (error) {
            console.error('Error fetching GitHub user:', error);
            dispatch({ type: 'GITHUB_USER_FAILURE', payload: error });
        }
    };
}

export const getGitHubToken = (code) => {
    return async (dispatch) => {
        try {
            const data = await fetchGithubToken(code);
            if (data.access_token) {
                dispatch(fetchTokenSuccess(data.access_token));
                dispatch(getUser(data.access_token));
            } else {
                dispatch(fetchTokenFailure(data.error || 'Token not received'));
            }
        } catch (error) {
            dispatch(fetchTokenFailure(error.message || 'Network error'));
        }
    };
};

export const getRepos = () => {
    return async (dispatch, getstate) => {
        dispatch({ type: 'GITHUB_REPO_REQUEST' });
        try {
            const state = getstate();
            const response = await fetchRepos(state.github.user.name, state.github.token);
            dispatch({ type: 'GITHUB_REPO_SUCCESS', payload: response });
            // dispatch(getPullRequests());
        } catch (error) {
            console.error('Error fetching GitHub branches:', error);
            dispatch({ type: 'GITHUB_REPO_FAILURE', payload: error });
        }
    };
}

export const getPullRequests = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'GITHUB_PR_REQUEST' });
        try {
            const state = getState();
            if (!state.github.repos.length) {
                return dispatch({ type: 'GITHUB_PR_FAILURE', payload: 'No repos found' });
            }


            const resultPromises = state.github.repos.map(repo =>
                fetchGithubPR({
                    owner: state.github.user.name,
                    repo: repo.name,
                })
            );

            const response = await Promise.all(resultPromises);

            dispatch({ type: 'GITHUB_PR_SUCCESS', payload: response });
        } catch (error) {
            console.error('Error fetching GitHub PR:', error);
            dispatch({ type: 'GITHUB_PR_FAILURE', payload: error });
        }
    };
}

export const getCommits = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'GITHUB_COMMITS_REQUEST' });
        try {
            const state = getState();
            if (!state.github.repos.length) {
                return dispatch({ type: 'GITHUB_COMMITS_FAILURE', payload: 'No repos found' });
            }
            
            const resultPromises = state.github.repos.map(repo =>
                fetchCommits({
                    owner: state.github.user.name,
                    repo: repo.name,
                })
            );

            const response = await Promise.all(resultPromises);

            dispatch({ type: 'GITHUB_COMMITS_SUCCESS', payload: response });
        } catch (error) {
            console.error('Error fetching GitHub Commits:', error);
            dispatch({ type: 'GITHUB_COMMITS_FAILURE', payload: error });
        }
    };
}