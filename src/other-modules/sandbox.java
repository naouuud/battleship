// public class User {
// 	MySqlDatabase database; //initialize variable
	
// 	public User() { //constructor
// 	 database = new MySqlDatabase()
//     }

//     public void add(String data) {
//         database.persist(data);
//     }
// }

/* instead of user instantiating another object, in this case 
a MySqlDatabase object, we have a higher control module do this and
pass it to us*/
public class IoC {
    public static void main(String[] args) {
        IoC container = new IoC(); //initializes class
        User user = container.new User(); //initialize User within IoC
        user.add("This is some data!");
    }

    public class User {
        MySqlDatabase database; //initialize variable

        public User() { // constructor
            database = new MySqlDatabase(); //initializes db class
        }

        public void add(String data) { //method
            database.persist(data); //calls persist on db
        }
    }

    public class MySqlDatabase {
        public void persist(String data) { //persist method
            System.out.println("Mysql has persisted: " + data);
        }
    }
}

/* cannot write unit tests for User since you rely on an instance of 
the db class (you cannot pass in a mock instance of this class)
If we wanted to use a different database, we can't, since we are tied 
to MySql. */

public class IoC {
    public static void main(String[] args) {
        IoC container = new IoC(); //initializes class
        User user = container.new User(container.new MySqlDatabase()); //initialize User within IoC
        user.add("This is some data!");
    }

    public class User(MySqlDatabase database) {
        Database database; //initialize variable

        public User(Database database) { // constructor
            this.database = database; //initializes db class
        }

        public void add(String data) { //method
            database.persist(data); //calls persist on db
        }
    }

    public interface Database {
        void persist(String data);
    }

    public class MySqlDatabase implements Database {
        public void persist(String data) { //persist method
            System.out.println("Mysql has persisted: " + data);
        }
    }

    public class OracleDatabase implements Database {
        public void persist(String data) {
            System.out.println("Oracle has persisted: " + data);
        }
    }
}

// We insert dependencies down from above