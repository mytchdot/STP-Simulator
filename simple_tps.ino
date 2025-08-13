const int potPin = A0;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  int potVal = analogRead(potPin);
  Serial.println(potVal);
  delay(15);
}
