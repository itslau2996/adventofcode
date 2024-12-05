YEAR_DIR=2024

run-%:
	@bun ./2024/$(addprefix day,$*)/index.js
# Default target to create the folder and files
create-%:
	@mkdir -p $(YEAR_DIR)/day$*                # Create the folder named day<DAY>
	@touch $(YEAR_DIR)/day$*/dataset.txt       # Create an empty dataset.txt
	@echo "" > $(YEAR_DIR)/day$*/index.js # Create and add content to index.js
