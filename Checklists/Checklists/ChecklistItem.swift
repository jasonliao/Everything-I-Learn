//
//  ChecklistItem.swift
//  Checklists
//
//  Created by  jasonliao on 11/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import Foundation
import UserNotifications

class ChecklistItem: NSObject, NSCoding {
    var text: String
    var checked: Bool
    var dueDate: Date
    var shouldRemind: Bool
    var itemID: Int
    
    init(text: String, checked: Bool) {
        self.text = text
        self.checked = checked
        itemID = DataModel.nextChecklistItemID()
        dueDate = Date()
        shouldRemind = false
        super.init()
    }
    
    deinit {
        removeNotification()
    }
    

    func toggleChecked() {
        checked = !checked
    }
    
    func scheduleNotification() {
        removeNotification()
        if shouldRemind && dueDate > Date() {
            let content = UNMutableNotificationContent()
            content.title = "Reminder:"
            content.body = text
            content.sound = UNNotificationSound.default()
            
            let calendar = Calendar(identifier: .gregorian)
            let components = calendar.dateComponents([.month, .day, .hour, .minute], from: dueDate)
            
            let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
            
            let request = UNNotificationRequest(identifier: "\(itemID)", content: content, trigger: trigger)
            
            let center = UNUserNotificationCenter.current()
            center.add(request)
            
        }
    }
    
    
    func removeNotification() {
        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: ["\(itemID)"])
    }
    
    // MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(text, forKey: "text")
        aCoder.encode(checked, forKey: "checked")
        aCoder.encode(dueDate, forKey: "dueDate")
        aCoder.encode(shouldRemind, forKey: "shouldRemind")
        aCoder.encode(itemID, forKey: "itemID")
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        let text = aDecoder.decodeObject(forKey: "text") as! String
        let checked = aDecoder.decodeBool(forKey: "checked")
        
        self.init(text: text, checked: checked)
        
        dueDate = aDecoder.decodeObject(forKey: "dueDate") as! Date
        shouldRemind = aDecoder.decodeBool(forKey: "shouldRemind")
        itemID = aDecoder.decodeInteger(forKey: "itemID")
    }

    
}
