echo "-------Installing MySQL-----------"
sudo apt-get install mysql-server-8.0 -y || sudo apt-get install mysql-server -y
 
# Verify MySQL installation
if ! command -v mysql &> /dev/null; then
  echo "MySQL installation failed!"
  exit 1
else
  echo "MySQL installed!"
fi
 
echo "-------Starting MySQL Service-----"
sudo systemctl daemon-reload
sudo systemctl enable mysql
 
echo "--------Creating Database ${DB_DATABASE}---------"
sudo mysql -u root -e "CREATE database IF NOT EXISTS ${DB_DATABASE};"
 
echo "-------Securing MySQL Installation and Granting Permissions-------"
sudo mysql -e "CREATE USER IF NOT EXISTS '${DB_USERNAME}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON *.* TO '${DB_USERNAME}'@'localhost' WITH GRANT OPTION;"
sudo mysql -e "FLUSH PRIVILEGES;"
 