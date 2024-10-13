import java.util.Scanner;

class addResearch{
        public static void main(String args[]){
                Scanner in = new Scanner(System.in);
                System.out.println("What is the title of the paper? *capitalize!");
                String title = in.nextLine();

                System.out.println("What are the topics related to the paper? chose from the topics below; insert a space between the words!");
		System.out.printf(" 1. representative --> type 'representative'\n 2. video understanding --> type 'video'\n 3. AI-human interaction --> type 'ai-human'\n 4. ImageNet Challenge --> type 'imagenet'\n 5. Image & video annotation --> type 'image' \n 6. object recognition --> type 'object'\n 7. education & diversity --> type 'education'\n 8. vision & language --> type 'vision'\n 9. fairness & transparency --> type 'fairness'\n");
                String topic = in.nextLine();
		

                System.out.println("Where is the photo? (ex.pics/PHOTONAME.png)");
                String photo = in.nextLine();

                System.out.println("What conference/journal? [type '1' if ICCV, '2' if NeurIPS, '3' if CVPR, '4' if FAT, '5' if ECCV, '6' if WACV, '7' if IJCV], '8' if other");
                int conferenceNum = in.nextInt();
		in.nextLine();
		String conference = "";
                String acronym = "";
		if (conferenceNum == 1){
			conference = "International Conference on Computer Vision";
			acronym = "ICCV";
		}	
		if (conferenceNum == 2){
                        conference = "Advances in Neural Information Processing Systems";
                        acronym = "NeurIPS";
                }

		if (conferenceNum == 3){
			System.out.println("Part of a workshop? type '1' if yes, '0' if no ");
                        int yes = in.nextInt();
                        in.nextLine();
                        if (yes == 1){
                                System.out.println("What is the name of the workshop? (ex. Parts and Attributes Workshop)");
                                conference = "CVPR ";
				conference += in.nextLine();
                                acronym = "CVPRW";
                        } else {
                        	conference = "Computer Vision and Pattern Recognition";
                        	acronym = "CVPR";
			}
                }

             	if (conferenceNum == 4){
                        conference = "Conference on Fairness, Accountability and Transparency";
                        acronym = "FAT*";
                }
		
		if (conferenceNum == 5){
			System.out.println("Part of a workshop? type '1' if yes, '0' if no ");
			int yes = in.nextInt();
			in.nextLine();
			if (yes == 1){
				System.out.println("What is the name of the workshop? (ex. Parts and Attributes Workshop)");
				conference = in.nextLine();
				conference += " at European Conference on Computer Vision";
				acronym = "ECCVW";
			} else {
                        	conference = "European Conference on Computer Vision";
                        	acronym = "ECCV";
			}
                }
		if (conferenceNum == 6){
                        conference = "Winter Conference on Applications of Computer Vision";
                        acronym = "WACV";
                }
		if (conferenceNum == 7){
                        conference = "International Journal of Computer Vision";
                        acronym = "IJCV";
                }

		if (conferenceNum == 8){
			System.out.print("What is the name of the conference/journal?");
                        conference = in.nextLine();
                        System.out.println("What is the acronym?");
			acronym = in.nextLine();
                }

 
		System.out.println("What year?");
                String year = in.nextLine();

                System.out.println("What is the link to the paper?");
                String paper = in.nextLine();

                System.out.println("Authors? *capitalize!");
                String name = in.nextLine();
		
		System.out.println("Any additional information you want to link? type '1' if yes, '0' if no ");
		int yes = in.nextInt();
                in.nextLine();
                if (yes == 1){
			System.out.println("What is the information? (ex. video, code, poster, slides, article)");
                        String information = in.nextLine();
                        System.out.println("What is the link to it?");
			String websiteLink = in.nextLine();
			
			System.out.println("Is there addition data that you want to link? type '1' if yes, '0' if no ");
		 	int yes2 = in.nextInt();
			in.nextLine();

			if (yes2 == 1){
				addCount = 1;
				while (addCount !=0){
					String stringName = "info" + count;
                                	System.out.println("What is the information? (ex. video, code, poster, slides, article)");
                       			String information = in.nextLine();
                        System.out.println("What is the link to it?");
                        String websiteLink = in.nextLine();
					String websiteName = "web" + count;
				}
			}
		}


                System.out.println("Put the text below into 'research.html' by typing in command: 'vi research.html' *make sure to include the tabs!");
                System.out.println("            <li class=\"post\" data-filter=\""+ topic +" \">");
                System.out.println("                <div class=\"research-row-2\">");
                System.out.println("                    <div>");
                System.out.println("                        <img src=\"" + photo + "\" id=\"research-photo\">");
                System.out.println("                    </div>");
                System.out.println("                    <div class=\"research-text\">");
                System.out.println("                        <a id=\"research-title\" href=\"" + paper + "\">" +  title + "</a>");
                System.out.println("                        <br/>\n                        <br/>");
                System.out.println("                        " + name + ". </br>");
                System.out.println("                        " + conference + "(<strong>" + acronym + "</strong>), " + year + ".");
                System.out.println("                        <br/>\n                        <br/>");
                System.out.println("                        [<a href=\"" + paper + "\">" + title + "</a>]");
                System.out.println("                        [<a href=\"http://visualai.princeton.edu/bibtex/visualai.bib\">bibtex</a>]");
                if (yes == 1){
			for (int i = 1; i < count+1; i++){
				String stringName = "info" + count;
				String websiteName = "web" + count;
				System.out.println("                        [<a href=\"" + websiteName + "\">" + stringName + "</a>]");
			}
		}
		System.out.println("                    </div>");
                System.out.println("                <div>");
                System.out.println("            <li>");
        }
}
