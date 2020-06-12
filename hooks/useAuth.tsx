import {
	useState,
	useEffect,
	useContext,
	createContext,
	ReactNode,
} from 'react';
import { auth, db } from 'config/firebase';
import { User } from 'interfaces/user';

const authContext = createContext({ user: {} });
const { Provider } = authContext;

// AuthProvider is a Context Provider that wraps our app and makes an auth object
// available to any child component that calls the useAuth() hook.
export function AuthProvider(props: { children: ReactNode }): JSX.Element {
	const auth = useAuthProvider();
	return <Provider value={auth}>{props.children}</Provider>;
}

// useAuth is a hook that enables any component to subscribe to auth state
export const useAuth: any = () => {
	return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useAuthProvider = () => {
	const [user, setUser] = useState(null);

	const createUser = (user: User) => {
		return db
			.collection('users')
			.doc(user.uid)
			.set(user)
			.then(() => {
				setUser(user);
				return user;
			})
			.catch((error) => {
				return { error };
			});
	};

	const signUp = ({ name, email, password }) => {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				auth.currentUser.sendEmailVerification();
				return createUser({ uid: response.user.uid, email, name });
			})
			.catch((error) => {
				return { error };
			});
	};

	const signIn = ({ email, password }) => {
		return auth
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				setUser(response.user);
				getUserAdditionalData(user);
				return response.user;
			})
			.catch((error) => {
				return { error };
			});
	};

	const signOut = () => {
		return auth.signOut().then(() => setUser(false));
	};

	const sendPasswordResetEmail = (email) => {
		return auth.sendPasswordResetEmail(email).then((response) => {
			return response;
		});
	};

	// Get the user data from Firestore
	const getUserAdditionalData = (user: firebase.User) => {
		return db
			.collection('users')
			.doc(user.uid)
			.get()
			.then((userData) => {
				if (userData.data()) {
					setUser(userData.data());
				}
			});
	};

	/// We need to get the user data from the Firestore db
	const handleAuthStateChanged = (user: firebase.User) => {
		setUser(user);
		if (user) {
			getUserAdditionalData(user);
		}
	};

	useEffect(() => {
		// Subscribe to user on mount
		const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

		// Unsubscribe on cleanup
		return () => unsubscribe();
	}, []);

	return {
		user,
		signUp,
		signIn,
		signOut,
		sendPasswordResetEmail,
	};
};
