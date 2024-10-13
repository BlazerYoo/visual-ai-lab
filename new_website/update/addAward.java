import java.util.Scanner;

class addAward{
        public static void main(String[] args){
                Scanner in = new Scanner(System.in);
                System.out.println("Name? *capitalize!");
                String name = in.nextLine();

                System.out.println("Name of award? *capitalize!");
                String award = in.nextLine();

                System.out.println("Year received?");
                String year = in.nextLine();

                System.out.println("Is there a website? Type '0' if yes, '1' if no website");
                int websiteYes = in.nextInt();
                in.nextLine();

                if (websiteYes == 1){
                        System.out.println("Put the text below into 'awards.html' by typing in command: 'vi awards.html' *make sure to include the tabs!");
                        System.out.println("                <tr>");
                        System.out.println("                    <td id=\"date\">" + name + "</td>");
                        System.out.println("                    <td>" + award + ", " + year + "</td>");
                        System.out.println("                </tr>");
                } else {
                        System.out.println("What is the website link?");
                        String website = in.nextLine();

                        System.out.println("Put the text below into 'awards.html' by typing in command: 'vi awards.html' *make sure to include the tabs!");
                        System.out.println("                <tr>");
                        System.out.println("                    <td id=\"date\">" + name + "</td>");
                        System.out.println("                    <td><a href=\"" + website + "\">" + award + "</a>, " + year + "</td>");
                        System.out.println("                </tr>");
                }
        }
}
