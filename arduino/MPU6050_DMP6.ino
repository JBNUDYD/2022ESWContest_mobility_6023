#include "I2Cdev.h"
#include "MPU6050_6Axis_MotionApps20.h"

#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
    #include "Wire.h"
#endif

unsigned long dataMillis = 0;
int count = 0;

MPU6050 mpu;

#define BUTTON1 8
#define BUTTON2 9
#define BUTTON3 10
#define BUTTON4 11
#define BUTTON5 12
#define BUTTON6 13
bool blinkState = false;

bool dmpReady = false;  // set true if DMP init was successful
uint8_t mpuIntStatus;   // holds actual interrupt status byte from MPU
uint8_t devStatus;      // return status after each device operation (0 = success, !0 = error)
uint16_t packetSize;    // expected DMP packet size (default is 42 bytes)
uint16_t fifoCount;     // count of all bytes currently in FIFO
uint8_t fifoBuffer[64]; // FIFO storage buffer

Quaternion q;           // [w, x, y, z]         quaternion container
VectorInt16 aa;         // [x, y, z]            accel sensor measurements
VectorInt16 aaReal;     // [x, y, z]            gravity-free accel sensor measurements
VectorInt16 aaWorld;    // [x, y, z]            world-frame accel sensor measurements
VectorFloat gravity;    // [x, y, z]            gravity vector
float euler[3];         // [psi, theta, phi]    Euler angle container
float ypr[3];           // [yaw, pitch, roll]   yaw/pitch/roll container and gravity vector
int button_data1;
int button_data2;
int button_data3;
int button_data4;
int button_data5;
int button_data6;

uint8_t teapotPacket[14] = { '$', 0x02, 0,0, 0,0, 0,0, 0,0, 0x00, 0x00, '\r', '\n' };

volatile bool mpuInterrupt = false;     // indicates whether MPU interrupt pin has gone high
void dmpDataReady() {
    mpuInterrupt = true;
}



// ================================================================
// ===                      INITIAL SETUP                       ===
// ================================================================

void setup() {
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif
    Serial.begin(9600);
    while (!Serial);
    mpu.initialize();

    devStatus = mpu.dmpInitialize();

    mpu.setXGyroOffset(220);
    mpu.setYGyroOffset(76);
    mpu.setZGyroOffset(-85);
    mpu.setZAccelOffset(1788); // 1688 factory default for my test chip

    if (devStatus == 0) {
        mpu.setDMPEnabled(true);

        attachInterrupt(0, dmpDataReady, RISING);
        mpuIntStatus = mpu.getIntStatus();

        dmpReady = true;

        packetSize = mpu.dmpGetFIFOPacketSize();
    } else {
        Serial.print(devStatus);
        Serial.println(F(")"));
    }

    pinMode(BUTTON1, INPUT);
    pinMode(BUTTON2, INPUT);
    pinMode(BUTTON3, INPUT);
    pinMode(BUTTON4, INPUT);
    pinMode(BUTTON5, INPUT);
    pinMode(BUTTON6, INPUT);
}



// ================================================================
// ===                    MAIN PROGRAM LOOP                     ===
// ================================================================

void loop() {
    if (!dmpReady) return;

    while (!mpuInterrupt && fifoCount < packetSize) {
    }

    mpuInterrupt = false;
    mpuIntStatus = mpu.getIntStatus();

    fifoCount = mpu.getFIFOCount();

    if ((mpuIntStatus & 0x10) || fifoCount == 1024) {
        mpu.resetFIFO();
        delay(10);
    } else if (mpuIntStatus & 0x02) {
        button_data1 = digitalRead(BUTTON1);
        button_data2 = digitalRead(BUTTON2);
        button_data3 = digitalRead(BUTTON3);
        button_data4 = digitalRead(BUTTON4);
        button_data5 = digitalRead(BUTTON5);
        button_data6 = digitalRead(BUTTON6);
        
        while (fifoCount < packetSize) fifoCount = mpu.getFIFOCount();

        mpu.getFIFOBytes(fifoBuffer, packetSize);
        
        fifoCount -= packetSize;
        mpu.dmpGetQuaternion(&q, fifoBuffer);
        mpu.dmpGetAccel(&aa, fifoBuffer);
        mpu.dmpGetGravity(&gravity, &q);
        mpu.dmpGetLinearAccel(&aaReal, &aa, &gravity);
        mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);
//        Serial.print(ypr[0] * 180/M_PI);
//        Serial.print("\t");
//        Serial.print(ypr[1] * 180/M_PI);
//        Serial.print("\t");
//        Serial.print(ypr[2] * 180/M_PI);
//        Serial.print("\t");
//        Serial.print(aaReal.x);
//        Serial.print("\t");
//        Serial.print(aaReal.y);
//        Serial.print("\t");
//        Serial.println(aaReal.z);
//        Serial.print("\t");
        Serial.print(button_data1);
        Serial.print("\t");
        Serial.print(button_data2);
        Serial.print("\t");
        Serial.print(button_data3);
        Serial.print("\t");
        Serial.print(button_data4);
        Serial.print("\t");
        Serial.print(button_data5);
        Serial.print("\t");
        Serial.println(button_data6);
    }
}
