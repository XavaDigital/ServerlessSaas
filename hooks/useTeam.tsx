import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { auth, db } from 'config/firebase';
import * as teamService from 'services/team';
import * as userService from 'services/user';

const authContext = createContext({ team: {} });
const { Provider } = authContext;

// TeamProvider is a Context Provider that wraps our app and makes an auth object
// available to any child component that calls the useTeam() hook.
export function TeamProvider(props: { children: ReactNode }): JSX.Element {
  const team = useTeamProvider();
  return <Provider value={team}>{props.children}</Provider>;
}

// useTeam is a hook that enables any component to subscribe to auth state
export const useTeam: any = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useTeamProvider = () => {
  const [team, setTeam] = useState(null);

  /// We need to get the team data from the Firestore db
  const handleAuthStateChanged = async (user: firebase.User) => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .onSnapshot(async (doc) => {
          if (doc.data()?.teamId) {
            const team = await teamService.getTeam(doc.data()?.teamId);
            setTeam(team);
          }
        });
    }
  };

  useEffect(() => {
    // Subscribe to auth state
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    // Unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Subscribe to team on mount
    if (team?.id) {
      db.collection('teams')
        .doc(team.id)
        .onSnapshot((doc) => setTeam(doc.data()));
    }
  }, [team?.id]);

  return {
    team,
  };
};
