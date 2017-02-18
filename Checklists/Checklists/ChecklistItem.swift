//
//  ChecklistItem.swift
//  Checklists
//
//  Created by  jasonliao on 11/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import Foundation

class ChecklistItem: NSObject, NSCoding {
    var text = ""
    var checked = false
    
    // MARK: Archiving Paths
    
    static let documentDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let archiveURL = documentDirectory.appendingPathComponent("checklist.plist")
    
    init(text: String, checked: Bool) {
        self.text = text
        self.checked = checked
    }
    
    func toggleChecked() {
        checked = !checked
    }
    
    // MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(text, forKey: "text")
        aCoder.encode(checked, forKey: "checked")
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init()
    }
}
