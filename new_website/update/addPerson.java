import java.util.Scanner;

class addPerson{
        public static void main(String[] args){
                Scanner in = new Scanner(System.in);
                System.out.println("What is the name?");
                String name = in.nextLine();


                System.out.println("Undergrad? --> type '1'");
                System.out.println("PhD student? --> type '2'");
                System.out.println("Postdoctoral student? --> type '3'");
                int number = in.nextInt();
                in.nextLine();
                String student = "";
                if (number == 1) {
                        student = "Undergraduate";
                } else if (number == 2) {
                        student = "PhD";
                } else {
                        student = "Postdoctoral";
                }

                System.out.println("What department? *capitalize! (ex. Computer Science)");
                String department = in.nextLine();

                System.out.println("What is the photo named? (make sure it is in the photo folder! --> ex. photos/name.png)");
                String photo = in.nextLine();


		System.out.println("Is there a website? Type '0' if yes, '1' if no website");
                int websiteYes = in.nextInt();
                in.nextLine();

                if (websiteYes == 1){
                        System.out.println("Put the text below into 'people.html' by typing in command: 'vi people.html' *make sure to include the tabs!");
                	System.out.printf("                <div>");
                	System.out.printf("\n                    <img src=\"" + photo + "\" id=\"reference-photo\"></br >");
                	System.out.printf("\n                    <b>" + name + "</b>");
                	System.out.printf("\n                    <br />");
                	System.out.printf("\n                    " + student +" Student");
                	System.out.printf("\n                    <br />");
                	System.out.printf("\n                    " +department + " Department");
                	System.out.printf("\n                    <br />");
                	System.out.printf("\n                </div>\n\n\n");
                } else {
                        System.out.println("What is the website link?");
                        String website = in.nextLine();

                        System.out.println("Put the text below into 'people.html' by typing in command: 'vi people.html' *make sure to include the tabs!");
                        System.out.printf("                <div>");
                	System.out.printf("\n                    <img src=\"" + photo + "\" id=\"reference-photo\"></br >");
                	System.out.printf("\n                    <a href=\"" + website + "\"><b>" + name + "</b></a>");
                	System.out.printf("\n                    <br />");
                	System.out.printf("\n                    " + student +" Student");
                	System.out.printf("\n                    <br />");
                	System.out.printf("\n                    " +department + " Department");
                	System.out.printf("\n                    <br />");
                	System.out.printf("\n                </div>\n\n\n");
		}
        }
}
