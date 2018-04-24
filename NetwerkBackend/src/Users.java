import java.util.ArrayList;
import java.util.Iterator;

public class Users {
	ArrayList<User> users;
	
	public Users() {
		this.users = new ArrayList<User>();
	}
	
	public Users(ArrayList<User> users) {
		this.users = users;
	}
	
	public void addUser(User u) {
		this.users.add(u);
	}
	
	public void displayAllUsers() {
		Iterator<User> it = this.users.iterator();
		while (it.hasNext()) {
			User u = it.next();
			u.dispUserDetails();
		}
	}
	
	public User findUserWithID(String userID) {
		Iterator<User> it = this.users.iterator();
		while (it.hasNext()) {
			User u = it.next();
			if (userID.equals(Integer.toString(u.getUserID()))) return u;
		}
		return null;
	}
	
	public User findUserWithName(String username) {
		Iterator<User> it = this.users.iterator();
		while (it.hasNext()) {
			User u = it.next();
			if (u.getUsername().equals(username)) return u;
		}
		return null;
	}
	
	public ArrayList<User> findUsersByName(String name) {
		ArrayList<User> results = new ArrayList<User>();
		Iterator<User> it = this.users.iterator();
		while (it.hasNext()) {
			User u = it.next();
			if (u.getUsername().contains(name)) results.add(u);
		}
		return results;
	}
}