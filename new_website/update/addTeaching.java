import java.util.Scanner;

public class addTeaching{
        public static void main(String[] args){
                Scanner in = new Scanner(System.in);
                System.out.println("What term? (ex. Fall 2019)");
                String date = in.nextLine();
                System.out.println("What is the course number and name? (ex. COS 429: Computer Vision)");
                String course = in.nextLine();
                System.out.println("What is the website link?");
                String website = in.nextLine();

                System.out.println("Put the text below into 'teaching.html' by typing in command: 'vi teaching.html' *make sure to include the tabs!");
                System.out.println("                <tr>");
                System.out.println("                    <td id=\"date\">" + date + "</td>");
                System.out.println("                    <td><a href=\"" + website + "\">" + course + "</a></td>");
                System.out.println("                </tr>");
        }
}



