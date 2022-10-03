import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore import GeoPoint
from gps import *
import time

cred = credentials.Certificate('arduino-a964c-firebase-adminsdk-hwucx-6c1e1be00e.json')
firebase_admin.initialize_app(cred)

class gpsTransmit():
  def __init__(self):
    # self.gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE)
    self.location = GeoPoint(0,0)
    self.i = 0

  def getPositionData(self):
    # nx = self.gpsd.next()
    self.location = GeoPoint(self.i,self.i)
    self.i = self.i + 1
    # if nx['class'] == 'TPV':
    #   lat = getattr(nx,'lat', "Unknown")
    #   lon = getattr(nx,'lon', "Unknown")
    #   self.location = GeoPoint(lat,lon)

  def gpsTransmit(self):
    self.getPositionData()
    db = firestore.client()
    doc_ref = db.collection(u'test').document(u'test')
    doc_ref.update({u'GPS': self.location})