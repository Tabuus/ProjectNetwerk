import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/* for testing purposes only */
public class Test {
	private Connection conn;
	
    public Test() {
        try {
        		Class.forName("com.mysql.jdbc.Driver");
        		this.conn = DriverManager.getConnection("jdbc:mysql://localhost/Netwerk?user=root&password=root&useSSL=false");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } catch (ClassNotFoundException cnfe) {
        		System.out.println(cnfe.getMessage());
        } catch (Exception e) {
        		System.out.println(e.getMessage());
        }   
    }
    
    public Users getUsers() {
    		Users users = new Users();
    		PreparedStatement ps = null;
		
    		try {
    			ps = this.conn.prepareStatement("SELECT u.userID, u.displayName, u.username, u.passwerd, u.image, u.company, u.job, u.description FROM Users u;");
    			ResultSet rs = ps.executeQuery();
    			
    			while (rs.next()) {
    				User u = new User(Integer.parseInt(rs.getString("userID")), rs.getString("displayName"), rs.getString("username"), rs.getString("passwerd"), rs.getString("image"), rs.getString("company"), rs.getString("job"), rs.getString("description"));
    				users.addUser(u);
    			}
    		} catch (SQLException e) {
    			System.out.println(e.getMessage());
    		} finally {
    			try {
	    			if (ps != null) ps.close();
	    		} catch (SQLException e) {
	    			System.out.println(e.getMessage());
	    		}
    		}
		
		return users;
    }

	private String addNewUser(String displayName, String username, String passwerd, String image, String company, String job, String description)  {
		String insert = "INSERT INTO Users (displayName, username, passwerd, image, company, job, description) VALUES (?, ?, ?, ?, ?, ?, ?);";
		PreparedStatement ps = null;
		
		try {
			ps = conn.prepareStatement(insert);
			ps.setString(1, displayName);
			ps.setString(2, username);
			ps.setString(3, passwerd);
			ps.setString(4, image);
			ps.setString(5, company);
			ps.setString(6, job);
			ps.setString(7, description);
			ps.executeUpdate();			
	    } catch (SQLException e) {
	        System.out.println(e.getMessage());
	    } finally {
	    		try {
	    			if (ps != null) ps.close();
	    		} catch (SQLException e) {
	    			System.out.println(e.getMessage());
	    		}
	    }
		
		try {
			ps = conn.prepareStatement("SELECT u.userID FROM Users u WHERE username=?;");
			ps.setString(1, username); 
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				String userID = rs.getString("userID");
				return userID;
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
		return "";		
	}
	
	private User findUser(String userID) {
		User u = getUsers().findUserWithID(userID);
		return u;
	}

	private List<User> getLikedUsers(String userID) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<User> likedUsers = new ArrayList<User>();
		
		try {
			ps = conn.prepareStatement("SELECT lu.likedID FROM LikedUsers lu WHERE userID=?;");
			ps.setString(1, userID); 
			rs = ps.executeQuery();
	
			while (rs.next()) {
				User u = findUser(rs.getString("likedID"));
				likedUsers.add(u);
			} 
		} catch (SQLException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
        		System.out.println(e.getMessage());
        } finally {
			try {
				if (rs != null) rs.close();
				if (ps != null) ps.close();
			} 
			catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}
		return likedUsers;
	}
	
	private void addToLiked(String likerID, String likedID) {
		String insert = "INSERT INTO LikedUsers (userID, likedID) VALUES (?, ?);";
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(insert);
			ps.setString(1, likerID);
			ps.setString(2, likedID);
			ps.executeUpdate();			
	    } catch (SQLException e) {
	        System.out.println(e.getMessage());
	    } finally {
	    		try {
	    			if (ps != null) ps.close();
	    		} catch (SQLException e) {
	    			System.out.println(e.getMessage());
	    		}
	    } 		
	}
	
	public static void main(String[] args) {
		Test test = new Test();
		Users users = test.getUsers();
		
		users.displayAllUsers();
		
		System.out.println("\n\n");
		test.addNewUser("heelo", "hi", "pw", "some url", "usc", "student", "lozs");
		users.displayAllUsers();
		
		System.out.println("\n\n");
		test.findUser("1").dispUserDetails();
		
		System.out.println("\n\n");
		List<User> liked = test.getLikedUsers("1");
		Iterator<User> it = liked.iterator();
		System.out.print("User 1 liked: ");
		while (it.hasNext()) {
			User u = it.next();
			System.out.print(u.getUserID() + " ");
		}
		
		System.out.println("\n\n");
		test.addToLiked("2", "1");
		List<User> liked1 = test.getLikedUsers("2");
		Iterator<User> it1 = liked1.iterator();
		System.out.print("User 2 liked: ");
		while (it1.hasNext()) {
			User u = it1.next();
			System.out.print(u.getUserID() + " ");
		}
	} 	

}
