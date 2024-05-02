from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chrome_options)

driver.get("http://35.187.242.96:3000")

def test_login():
    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='username']"))
    )
    password_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[id='password']"))
    )
    login_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
    )

    username_input.send_keys("admin")
    password_input.send_keys("1234")

    login_button.click()
    driver.quit()

def test_register():
    driver.find_element(By.ID, "firstName").send_keys("John")
    driver.find_element(By.ID, "lastName").send_keys("Doe")
    driver.find_element(By.ID, "email").send_keys("john.doe@example.com")
    driver.find_element(By.ID, "contactNumber").send_keys("1234567890")
    driver.find_element(By.ID, "nic").send_keys("123456789X")
    driver.find_element(By.ID, "address1").send_keys("123 Main St")
    driver.find_element(By.ID, "address2").send_keys("Apt 1")
    driver.find_element(By.ID, "userName").send_keys("johndoe")
    driver.find_element(By.ID, "password").send_keys("password123")

    # Submit the form
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    # Wait for the registration to complete (you may need to adjust the wait time)
    WebDriverWait(driver, 10).until(
        EC.url_contains("URL_OF_NEXT_PAGE_AFTER_REGISTRATION")
    )

    # Assert that the registration was successful (you may need to add more assertions based on your application)
    assert "Registration successful" in driver.page_source
    driver.quit()

test_login()
test_register()
