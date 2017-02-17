//
//  ChecklistTableViewController.swift
//  Checklists
//
//  Created by  jasonliao on 10/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import UIKit

class ChecklistTableViewController: UITableViewController, ItemDetailTableViewControllerDelegate {
    
    var checklistItems = [ChecklistItem]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        loadSampleChecklistItem()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return checklistItems.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "ChecklistItem", for: indexPath)
        let item = checklistItems[indexPath.row]
        
        configureText(for: cell, with: item)
        configureCheckmark(for: cell, with: item)

        return cell
    }
    
    // MARK: Select row
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if let cell = tableView.cellForRow(at: indexPath) {
            let item = checklistItems[indexPath.row]
            item.toggleChecked()
            configureCheckmark(for: cell, with: item)
        }
        
        tableView.deselectRow(at: indexPath, animated: true)
    }

    
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    

    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            checklistItems.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {

        if segue.identifier == "AddItem" {
            let navigationController = segue.destination as! UINavigationController
            let viewController = navigationController.topViewController as! ItemDetailTableViewController
            viewController.delegate = self
        } else if segue.identifier == "EditItem" {
            let navigationController = segue.destination as! UINavigationController
            let viewController = navigationController.topViewController as! ItemDetailTableViewController
            viewController.delegate = self
            if let indexPath = tableView.indexPath(for: sender as! UITableViewCell) {
                viewController.editItem = checklistItems[indexPath.row]
            }
        }
    }

    
    // MARK: ItemDetailTableViewControllerDelegate
    
    func itemDetailTableViewController(_ controller: ItemDetailTableViewController, didFinishAdding item: ChecklistItem) {
        let count = checklistItems.count
        let indexPath = IndexPath(row: count, section: 0)
        
        checklistItems.append(item)
        tableView.insertRows(at: [indexPath], with: .automatic)
        
        dismiss(animated: true, completion: nil)
    }
    
    func itemDetailTableViewController(_ controller: ItemDetailTableViewController, didFinishEditing item: ChecklistItem) {
        
        if let index = checklistItems.index(of: item) {
            let indexPath = IndexPath(row: index, section: 0)
            if let cell = tableView.cellForRow(at: indexPath) {
                configureText(for: cell, with: item)
            }
        }
    
        dismiss(animated: true, completion: nil)
    }
    
    func itemDetailTableViewControllerDidCancel(_ controller: ItemDetailTableViewController) {
        dismiss(animated: true, completion: nil)
    }
    
    // MARK: Private function
    
    private func configureCheckmark(for cell: UITableViewCell, with item: ChecklistItem) {
        let label = cell.viewWithTag(1000) as! UILabel
        if item.checked {
            label.text = "√"
        } else {
            label.text = ""
        }
    }
    
    private func configureText(for cell: UITableViewCell, with item: ChecklistItem) {
        let label = cell.viewWithTag(520) as! UILabel
        label.text = item.text
    }
    
    private func loadSampleChecklistItem() {
        let checklistItem0 = ChecklistItem(text: "Walk the dog", checked: false)
        let checklistItem1 = ChecklistItem(text: "Brush my teeth", checked: false)
        let checklistItem2 = ChecklistItem(text: "Learn iOS development", checked: true)
        let checklistItem3 = ChecklistItem(text: "Soccer practice", checked: false)
        let checklistItem4 = ChecklistItem(text: "Eat ice cream", checked: true)
        
        checklistItems += [checklistItem0, checklistItem1, checklistItem2, checklistItem3, checklistItem4]
    }
}
