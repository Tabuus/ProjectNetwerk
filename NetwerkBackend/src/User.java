public class User {
	private int userID;
	private String displayName;
	private String username;
	private String passwerd;
	private String image;
	private String company; 
	private String job;
	private String description;

	public User(int userID, String displayName, String username, String passwerd, String image, String company, String job, String description) {
		this.userID = userID;
		this.displayName = displayName;
		this.username = username;
		this.passwerd = passwerd;
		this.image = image;
		this.company = company;
		this.job = job;
		this.description = description;
	}
	
	public int getUserID() {
		return this.userID;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPasswerd() {
		return passwerd;
	}
	public void setPasswerd(String passwerd) {
		this.passwerd = passwerd;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public void dispUserDetails() {
		System.out.println("userID: " + userID);
		System.out.println("displayName: " + displayName + "\tUsername: " + username + "\tPassword " + passwerd);
		System.out.println("Works as " + job + " at " + company);
		System.out.println("Description: " + description);
	}
}
