import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/NetwerkBackend")
public class NetwerkBackend extends HttpServlet {
	private Connection conn;
	private PrintWriter out;
	private static final long serialVersionUID = 1L;
	private Gson gson;	
    
    public NetwerkBackend() {
    		super();
    		this.gson = new Gson();
        try {
        		Class.forName("com.mysql.jdbc.Driver");
        		this.conn = DriverManager.getConnection("jdbc:mysql://localhost/Netwerk?user=root&password=Wenjiaying9801&useSSL=false");
        } catch (SQLException se) {
        	System.out.println("se: " + se.getMessage());
        } catch (ClassNotFoundException cnfe) {
        		System.out.println("cnfe: " + cnfe.getMessage());
        } catch (Exception e) {
        		System.out.println("e: " + e.getMessage());
        }   
    }
    
    private User getUserDetailsByID(String userID) {
		User u = getAllUsers().findUserWithID(userID);
		return u;
	}
    
    private Users getUsersByName(String name) {
		ArrayList<User> u = getAllUsers().findUsersByName(name);
		
		return new Users(u);
	}

    public Users getAllUsers() {
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
    
    public Users getAllUsers(String userID) {
    	System.out.println(userID);
		Users users = new Users();
		PreparedStatement ps = null;
		ArrayList<User> liked = getLikedUsers(userID);
		try {
			ps = this.conn.prepareStatement("SELECT u.userID, u.displayName, u.username, u.passwerd, u.image, u.company, u.job, u.description FROM Users u;");
			ResultSet rs = ps.executeQuery();
			outerloop:
			while (rs.next()) {
				if(userID.equals(rs.getString("userID"))) continue;
				for(User user : liked) {
					if(user.getUserID() == Integer.parseInt(rs.getString("userID"))) continue outerloop;
				}
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
		
	private ArrayList<User> getLikedUsers(String userID) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		ArrayList<User> likedUsers = new ArrayList<User>();
		
		try {
			ps = conn.prepareStatement("SELECT lu.likedID FROM LikedUsers lu WHERE userID=?;");
			ps.setString(1, userID); 
			rs = ps.executeQuery();
	
			while (rs.next()) {
				User u = getUserDetailsByID(rs.getString("likedID"));
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
	
	private boolean addToLiked(String likerID, String likedID) { // if both users like each other => match (return true)
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
		Users users = new Users(getLikedUsers(likedID));
		User check = users.findUserWithID(likerID);
		if(check == null) return false;
		else return true;
	}
	
	private int verifyLogin(String username, String password) {
		User user = getAllUsers().findUserWithName(username);
		if (user == null) return -1;
		else if (user.getPasswerd().equals(password)) return user.getUserID();
		else return -1;
	}
	
	private int addNewUser(String displayName, String username, String passwerd, String image, String company, String job, String description)  {
		System.out.println("displayName: " + displayName);
		System.out.println("username: " + username);
		System.out.println("passwerd: " + passwerd);
		System.out.println("image: " + image);
		System.out.println("company: " + company);
		System.out.println("job: " + job);
		System.out.println("description: " + description);

		User user = getAllUsers().findUserWithName(username);
		if (user != null) {
			System.out.println("aiyo");
			return -1; // already taken
		} 
		
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
				return Integer.parseInt(userID);
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
		return -2;		
	}
	
	private Users getMatches(String UserID) {
    	//for each user, loop through to see if userID is in there getliked user
		Users matches = new Users();
		
		ArrayList<User> likedUsers = getLikedUsers(UserID);
		
		for(int i = 0; i < likedUsers.size(); i++) {
			User u = likedUsers.get(i);
			String tempID = Integer.toString(u.getUserID());
			ArrayList<User> temp = getLikedUsers(tempID);
			for(int j = 0; j < temp.size(); j++) {
				if(Integer.toString(temp.get(j).getUserID()).equals(UserID)) {
					matches.addUser(u);
				}
			}	
		}
		
		return matches;
}
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("here");
		String functionToExecute = request.getParameter("functionToExecute");
		System.out.println(functionToExecute);
		response.setContentType("application/json");
		this.out = response.getWriter();
		
		if (functionToExecute == null) {
			return;
		}
		else if (functionToExecute.equals("addNewUser")) { // add user to database
			int userID = addNewUser(request.getParameter("displayName"),
										request.getParameter("username"),
										request.getParameter("passwerd"),
										request.getParameter("image"),
										request.getParameter("company"),
										request.getParameter("job"),
										request.getParameter("description"));
			System.out.println("in add new user, userID is " + userID);
			this.out.print(userID); // send userID back to frontend
			this.out.flush();
		}
		else if (functionToExecute.equals("getUserDetailsByID")) { // send User object back to frontend
			String userID = request.getParameter("userID");
			User user = getUserDetailsByID(userID);
			System.out.println(user);
			this.out.print(gson.toJson(user)); 
			this.out.flush();
		}
		else if (functionToExecute.equals("getUsersByName")) { // send User object back to frontend
			String name = request.getParameter("name");
			Users users = getUsersByName(name);
			this.out.print(gson.toJson(users)); 
			this.out.flush();
		}
		else if (functionToExecute.equals("getAllUsers")) {
			String userID = request.getParameter("userID");
			System.out.println(userID);
			if (userID.equals("#")) {
				System.out.println("guest user");
				this.out.print(gson.toJson(getAllUsers()));
				this.out.flush();
			}
			else {
				Users users = getAllUsers(userID);
				this.out.print(gson.toJson(users));
				this.out.flush();
			}
		}
		else if (functionToExecute.equals("getLikedUsers")) { // get list of all users that userID liked
			String userID = request.getParameter("userID");
			ArrayList<User> likedUsers = getLikedUsers(userID);
			this.out.print(gson.toJson(likedUsers));
			this.out.flush();
		} 
		else if (functionToExecute.equals("addToLiked")) { 
			String likerID = request.getParameter("likerID");
			String likedID = request.getParameter("likedID");
			boolean matched = addToLiked(likerID, likedID);
			this.out.print(matched);
			this.out.flush();
		} 
		else if (functionToExecute.equals("verifyLogin")) {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			int userID = verifyLogin(username, password);
			this.out.print(userID);
			this.out.flush();
		} 
		else if(functionToExecute.equals("getMatches")) {
			String userID = request.getParameter("userID");
			Users users = getMatches(userID);
			this.out.print(gson.toJson(users));
			this.out.flush();
			
		}
	} 	
}
